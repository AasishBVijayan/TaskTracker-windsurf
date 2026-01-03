import React from 'react';

interface TaskSummaryCardsProps {
  totalTasks: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

const TaskSummaryCards: React.FC<TaskSummaryCardsProps> = ({
  totalTasks,
  inProgress,
  completed,
  overdue,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Tasks Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0,50 Q25,30 50,50 T100,50 T75,70 T100,50 T50,30 T0,50" fill="rgba(59, 130, 246, 0.1)" />
          </svg>
        </div>
        <div className="flex items-center relative z-10">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9z" />
              </svg>
            </div>
          </div>
          <div className="ml-5">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{totalTasks}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
          </div>
        </div>
      </div>

      {/* In Progress Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0,50 Q25,70 50,50 T100,50 T75,30 T100,50 T50,70 T0,50" fill="rgba(251, 146, 60, 0.1)" />
          </svg>
        </div>
        <div className="flex items-center relative z-10">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3l3 3m-9-6h6m-6 6h6m2 5H7a2 2 0 01-2-2v-6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293l3.414 3.414a1 1 0 01.707 0l3.414-3.414a1 1 0 01-.707-.293z" />
              </svg>
            </div>
          </div>
          <div className="ml-5">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{inProgress}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">In Progress</div>
          </div>
        </div>
      </div>

      {/* Completed Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0,50 Q25,30 50,50 T100,50 T75,70 T100,50 T50,30 T0,50" fill="rgba(34, 197, 94, 0.1)" />
          </svg>
        </div>
        <div className="flex items-center relative z-10">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-5">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{completed}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
          </div>
        </div>
      </div>

      {/* Overdue Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0,50 Q25,70 50,50 T100,50 T75,30 T100,50 T50,70 T0,50" fill="rgba(239, 68, 68, 0.1)" />
          </svg>
        </div>
        <div className="flex items-center relative z-10">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-5">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{overdue}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Overdue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummaryCards;
