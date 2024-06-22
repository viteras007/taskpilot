import TaskForm from "@/components/TaskForm";

export default function EditTaskPage({ params }: { params: { id: string } }) {
  return (
    <>
      <h1>{params.id}</h1>
      <TaskForm type="edit" />
    </>
  );
}
