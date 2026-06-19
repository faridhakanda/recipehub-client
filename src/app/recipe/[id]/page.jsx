import Link from 'next/link';
import React from 'react';

const RecipeDetailsPage = async ({ params }) => {
    const { id } = await params;
    return (
        <div>
            <h2>Id: {id}</h2>
            
            <h2>Here is Recipe Details</h2>
            <p>If want to show recipe details with title then use here meta data from metadata page in components folder!</p>

            <Link className='bg-blue-500 px-2 py-1 rounded-md m-1 mx-auto' href={'/recipe'}>Back to Recipe</Link>
        </div>
    );
};

export default RecipeDetailsPage;