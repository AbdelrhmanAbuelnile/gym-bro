import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
} from "@/components/ui/form";
import { Button, Input } from "@/components/ui/registry";
import type { Training, TrainingSet } from "@/types";
import { useForm } from "react-hook-form";
import { Pencil, Trash2, X } from "lucide-react";

interface TrainingDetailDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	training: Training;
	onAddSet: (trainingId: string, set: Omit<TrainingSet, "date">) => void;
	onDeleteSet: (trainingId: string, setIndex: number) => void;
	onUpdateSet: (
		trainingId: string,
		setIndex: number,
		updates: Partial<Omit<TrainingSet, "date">>
	) => void;
}

interface SetFormData {
	reps: number;
	weight?: number;
	notes?: string;
}

export function TrainingDetailDialog({
	open,
	onOpenChange,
	training,
	onAddSet,
	onDeleteSet,
	onUpdateSet,
}: TrainingDetailDialogProps) {
	const [editingSetIndex, setEditingSetIndex] = useState<number | null>(null);

	const form = useForm<SetFormData>({
		defaultValues: {
			reps: 0,
			weight: undefined,
			notes: "",
		},
	});

	const editForm = useForm<SetFormData>();

	const onSubmit = (data: SetFormData) => {
		onAddSet(training.id, data);
		form.reset();
	};

	const onEditSubmit = (data: SetFormData) => {
		if (editingSetIndex === null) return;
		onUpdateSet(training.id, editingSetIndex, data);
		setEditingSetIndex(null);
	};

	const startEditing = (setIndex: number, set: TrainingSet) => {
		setEditingSetIndex(setIndex);
		editForm.reset({
			reps: set.reps,
			weight: set.weight,
			notes: set.notes,
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
				<DialogHeader>
					<DialogTitle dir="auto">{training.name}</DialogTitle>
				</DialogHeader>

				<div className="flex-1 overflow-y-auto px-1">
					<div className="space-y-6">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="reps"
									render={({ field }) => (
										<FormItem>
											<FormLabel dir="auto">Reps</FormLabel>
											<FormControl>
												<Input
													type="number"
													min={0}
													{...field}
													onChange={(e) =>
														field.onChange(Number(e.target.value))
													}
													dir="auto"
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="weight"
									render={({ field }) => (
										<FormItem>
											<FormLabel dir="auto">Weight (optional)</FormLabel>
											<FormControl>
												<Input
													type="number"
													min={0}
													{...field}
													onChange={(e) =>
														field.onChange(Number(e.target.value))
													}
													dir="auto"
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="notes"
									render={({ field }) => (
										<FormItem>
											<FormLabel dir="auto">Notes (optional)</FormLabel>
											<FormControl>
												<Input {...field} dir="auto" />
											</FormControl>
										</FormItem>
									)}
								/>

								<Button type="submit" dir="auto" className="w-full">
									Add Set
								</Button>
							</form>
						</Form>

						<div className="mt-6">
							<h4 className="text-sm font-medium mb-4" dir="auto">
								Previous Sets
							</h4>
							<div className="space-y-2">
								{training.sets.map((set, index) => (
									<div key={index}>
										{editingSetIndex === index ? (
											<Form {...editForm}>
												<form
													onSubmit={editForm.handleSubmit(onEditSubmit)}
													className="space-y-2 p-2 bg-muted rounded-md"
												>
													<div className="grid grid-cols-2 gap-2">
														<FormField
															control={editForm.control}
															name="reps"
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input
																			type="number"
																			min={0}
																			placeholder="Reps"
																			{...field}
																			onChange={(e) =>
																				field.onChange(Number(e.target.value))
																			}
																			dir="auto"
																		/>
																	</FormControl>
																</FormItem>
															)}
														/>
														<FormField
															control={editForm.control}
															name="weight"
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input
																			type="number"
																			min={0}
																			placeholder="Weight"
																			{...field}
																			onChange={(e) =>
																				field.onChange(Number(e.target.value))
																			}
																			dir="auto"
																		/>
																	</FormControl>
																</FormItem>
															)}
														/>
													</div>
													<FormField
														control={editForm.control}
														name="notes"
														render={({ field }) => (
															<FormItem>
																<FormControl>
																	<Input
																		placeholder="Notes"
																		{...field}
																		dir="auto"
																	/>
																</FormControl>
															</FormItem>
														)}
													/>
													<div className="flex gap-2">
														<Button type="submit" size="sm" className="flex-1">
															Save
														</Button>
														<Button
															type="button"
															variant="outline"
															size="sm"
															onClick={() => setEditingSetIndex(null)}
														>
															<X className="h-4 w-4" />
														</Button>
													</div>
												</form>
											</Form>
										) : (
											<div
												className="text-sm p-2 bg-muted rounded-md"
												dir="auto"
											>
												<div className="flex justify-between items-start mb-1">
													<div className="flex-1">
														<p>Reps: {set.reps}</p>
														{set.weight && <p>Weight: {set.weight}</p>}
														{set.notes && <p>Notes: {set.notes}</p>}
														<p className="text-xs text-muted-foreground">
															{new Date(set.date).toLocaleString()}
														</p>
													</div>
													<div className="flex gap-1">
														<Button
															variant="ghost"
															size="icon"
															onClick={() => startEditing(index, set)}
														>
															<Pencil className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="icon"
															onClick={() => onDeleteSet(training.id, index)}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
