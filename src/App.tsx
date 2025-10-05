import { useState } from "react";
import { Card } from "@/components/ui/registry";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AddTrainingDialog } from "@/components/add-training-dialog";
import { TrainingDetailDialog } from "@/components/training-detail-dialog";
import type { Training } from "@/types";

function App() {
	const { trainings, addTraining, addSetToTraining } = useLocalStorage();
	const [selectedTraining, setSelectedTraining] = useState<Training | null>(
		null
	);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<main className="container mx-auto py-8 px-4">
				<div className="flex flex-col justify-between items-center gap-8">
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
					onAddSet={addSetToTraining}
				/>
			)}
		</div>
	);
}

export default App;
