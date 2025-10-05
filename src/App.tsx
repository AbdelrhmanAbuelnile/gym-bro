import { useState } from "react";
import { Card } from "@/components/ui/registry";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AddTrainingDialog } from "@/components/add-training-dialog";
import { TrainingDetailDialog } from "@/components/training-detail-dialog";
import type { Training, TrainingSet } from "@/types";

function App() {
	const { trainings, addTraining, addSetToTraining, deleteSet, updateSet } =
		useLocalStorage();
	const [selectedTraining, setSelectedTraining] = useState<Training | null>(
		null
	);

	// Wrapped handlers to keep UI in sync
	const handleAddSet = (trainingId: string, set: Omit<TrainingSet, "date">) => {
		addSetToTraining(trainingId, set);
		const updatedTraining = trainings.find((t) => t.id === trainingId);
		if (updatedTraining) {
			setSelectedTraining(updatedTraining);
		}
	};

	const handleDeleteSet = (trainingId: string, setIndex: number) => {
		deleteSet(trainingId, setIndex);
		setSelectedTraining(null); // Close dialog after deletion
	};

	const handleUpdateSet = (
		trainingId: string,
		setIndex: number,
		updates: Partial<Omit<TrainingSet, "date">>
	) => {
		updateSet(trainingId, setIndex, updates);
		setSelectedTraining(null); // Close dialog after update
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="container mx-auto py-8 px-4">
				<div className="flex flex-col justify-between items-center gap-8 mb-8">
					<div className="flex justify-center items-center gap-2">
						<h1 className="text-3xl font-bold" dir="auto">
							Gym Bro
						</h1>
						<img src="/logo.png" alt="Gym Bro Logo" width={52} height={52} />
					</div>
					<AddTrainingDialog
						onAdd={({ name }) => addTraining({ name, sets: [] })}
					/>
				</div>

				{/* Training List */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{trainings.map((training) => (
						<Card
							key={training.id}
							className="p-4 cursor-pointer hover:bg-accent transition-colors"
							onClick={() => setSelectedTraining(training)}
						>
							<h3 className="text-xl font-semibold mb-2" dir="auto">
								{training.name}
							</h3>
							<p className="text-muted-foreground" dir="auto">
								{training.sets.length} sets recorded
							</p>
						</Card>
					))}
				</div>
			</main>

			{selectedTraining && (
				<TrainingDetailDialog
					open={!!selectedTraining}
					onOpenChange={(open) => !open && setSelectedTraining(null)}
					training={selectedTraining}
					onAddSet={handleAddSet}
					onDeleteSet={handleDeleteSet}
					onUpdateSet={handleUpdateSet}
				/>
			)}
		</div>
	);
}

export default App;
