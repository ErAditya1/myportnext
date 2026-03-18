import EditProjectForm from './EditProjectForm';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return <EditProjectForm id={params.id} />;
}
