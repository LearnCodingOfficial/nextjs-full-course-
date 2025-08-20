import React from 'react'

export default function TaskView({task}) {
  return (
    <div>
      <h2 className='text-xl font-bold mb-2'>{task.title}</h2>
      <p className='mb-2'><strong>Description:</strong> {task.description}</p>
      <p className='mb-2'><strong>Status:</strong> {task.status}</p>
    </div>
  )
}
