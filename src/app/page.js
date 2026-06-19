import { getAllUsers } from "@/lib/actions/allGet";
import { Button } from "@heroui/react";
import Image from "next/image";

export default async function Home() {
    const users = await getAllUsers();
    console.log(users, 'users');
    
  return (
    <div>
        <h2>RecipeHub - Recipe Sharing Platform!</h2>
        <Button>
            My Button
        </Button>
        <h2>Total user is registered: {users.length}</h2>
        <div>
            {users.map(user => 
                <div key={user._id}>
                    <h2>{user._id}</h2>
                    <h2>Name: {user.name}</h2>
                    <h2>Email: {user.email}</h2>
                    <h2>PhotoUrl: {user.photoUrl}</h2>
                </div>
            )}
        </div>
    </div>
  );
}
