import { Link } from 'react-router-dom';

function TaskList({ task }) {
	return (
		<div className={`single-task ${task.completed && 'task-completed'}`}>
			<h5>
				<span>
					<i className='far fa-check-circle'></i>
				</span>
				{task.task_name}
			</h5>
			<div className='task-links'>
				{/* <!-- edit link --> */}
				<Link to={`/edit/${task.id}`} className='edit-link'>
					<i className='fas fa-edit'></i>
				</Link>
				{/* <!-- delete btn --> */}
				<button
					onClick={() => {
						handleDelete(task.id);
					}}
					type='button'
					className='delete-btn'
				>
					<i className='fas fa-trash'></i>
				</button>
			</div>
		</div>
	);
}
export default TaskList;
