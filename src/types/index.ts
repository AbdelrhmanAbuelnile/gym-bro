export interface TrainingSet {
	reps: number;
	weight?: number;
	notes?: string;
	date: string;
}

export interface Training {
	id: string;
	name: string;
	sets: TrainingSet[];
	createdAt: string;
	updatedAt: string;
}
