import { useState, useEffect } from "react";
import type { Training, TrainingSet } from "@/types";

const STORAGE_KEY = "gym-bro-trainings";

export function useLocalStorage() {
	const [trainings, setTrainings] = useState<Training[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				setTrainings(JSON.parse(stored));
			} catch (error) {
				console.error("Error parsing stored trainings:", error);
				setTrainings([]);
			}
		}
	}, []);

	const saveTrainings = (newTrainings: Training[]) => {
		setTrainings(newTrainings);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrainings));
	};

	const addTraining = (
		training: Omit<Training, "id" | "createdAt" | "updatedAt">
	) => {
		const newTraining: Training = {
			...training,
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		saveTrainings([...trainings, newTraining]);
	};

	const updateTraining = (id: string, updates: Partial<Training>) => {
		const updatedTrainings = trainings.map((training) =>
			training.id === id
				? {
						...training,
						...updates,
						updatedAt: new Date().toISOString(),
				  }
				: training
		);
		saveTrainings(updatedTrainings);
	};

	const deleteTraining = (id: string) => {
		const filteredTrainings = trainings.filter(
			(training) => training.id !== id
		);
		saveTrainings(filteredTrainings);
	};

	const addSetToTraining = (
		trainingId: string,
		set: Omit<TrainingSet, "date">
	) => {
		const training = trainings.find((t) => t.id === trainingId);
		if (!training) return;

		const newSet: TrainingSet = {
			...set,
			date: new Date().toISOString(),
		};

		updateTraining(trainingId, {
			sets: [...training.sets, newSet],
		});
	};

	return {
		trainings,
		addTraining,
		updateTraining,
		deleteTraining,
		addSetToTraining,
	};
}
