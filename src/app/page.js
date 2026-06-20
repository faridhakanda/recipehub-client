import { getAllUsers } from "@/lib/actions/allGet";
import { Button } from "@heroui/react";
import Image from "next/image";

export default async function Home() {
    const users = await getAllUsers();
    console.log(users, 'users');
    const url = false;
    const remoteUrl = "https://i.ibb.co.com/gMkB12xv/google.png";
  return (
    <div>
        <h2>RecipeHub - Recipe Sharing Platform!</h2>
        <Button>
            My Button
        </Button>
        <Image src={url ? 'https://farid.com/farid.png' : '/avatar.png'} alt="avatar" width={32} height={32} />
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
