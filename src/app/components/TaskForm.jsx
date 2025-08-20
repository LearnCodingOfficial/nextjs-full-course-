import React from 'react'

export default function TaskForm({formData, setFormData, onSubmit, onCancel, buttonLabel}) {
  return (
    <form className='space-y-4' onSubmit={onSubmit}>
       <input 
        type='text'
        placeholder='Task title'
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className='w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg p-2'
        required
       />
       <textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className='w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg p-2'
        required
       />
       <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        className='w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg p-2'
        required
       >
         <option value=''>Select status</option>
         <option value='Pending'>Pending</option>
         <option value='In Progress'>In Progress</option>
         <option value='Completed'>Completed</option>
       </select>
       <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-md'>
         {buttonLabel}
       </button>
       <button type='button' className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md' onClick={onCancel}>
         Cancel
       </button>
    </form>
  )
}
