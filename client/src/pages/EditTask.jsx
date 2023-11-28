import { useParams } from 'react-router-dom';

function EditTask() {
	const { id } = useParams();

	console.log(id);

	return <div>EditTask - {id}</div>;
}
export default EditTask;
