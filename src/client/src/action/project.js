export const UPDATE_PROJECT_ID = 'UPDATE_PROJECT_ID';

export function updateProjectId(projectId) {
    return {
        type: UPDATE_PROJECT_ID,
        projectId
    };
}