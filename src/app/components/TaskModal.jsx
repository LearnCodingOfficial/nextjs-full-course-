import React, { Children } from 'react'

export default function TaskModal({children, onClose}) {
  return (
    <div className='fixed inset-0 flex items-center justify-center backdrop-blur-2xl z-50'>
        <div className='bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-md'>
            {children}
            <div className='flex justify-end mt-4'>
                <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300' onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
      
    </div>
  )
}
