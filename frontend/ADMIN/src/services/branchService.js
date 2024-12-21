const addBranch = async (branchData) => {
    try {
        const response = await fetch('http://localhost:3000/api/branches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(branchData)
        });

        if (!response.ok) {
            throw new Error('Failed to add branch');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding branch: ', error);
        throw new Error('Failed to add branch');
    }
};

export default addBranch;