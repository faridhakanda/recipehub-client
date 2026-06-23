import Banner from "@/components/ui/banner";
import HomeBanner from "@/components/ui/homeBanner";
import { getAllUsers } from "@/lib/actions/allGet";
import { getUserSession, getUserToken } from "@/lib/core/session";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const users = await getAllUsers();
    console.log(users, 'users');
    const user = await getUserSession();
    console.log('user session', user);
    const userToken = await getUserToken();
    console.log('user token', userToken);
    const url = false;
    const remoteUrl = "https://i.ibb.co.com/gMkB12xv/google.png";
  return (
    <div>
        <HomeBanner />
        <Banner />
        {/* <h2>RecipeHub - Recipe Sharing Platform!</h2>
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
        </div> */}
        <div className="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div >
                {/* <h2 className="font-bold text-4xl">Explore all of our recipe</h2> */}
            </div>
            <Link href={'/recipe'}>
                <Button className={'rounded-md font-bold'}>Explore Recipe</Button>
            </Link>
            
        </div>
        {/* Features recipe  */}
        <div className="justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h2 className="text-xl md:text-4xl font-bold">Featured Recipes</h2>
            <div>
                <h2>All features recipe</h2>
            </div>
        </div>
        {/* Popular recipe */}
        <div className=" justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h2 className="text-xl md:text-4xl font-bold">Popular Recipes</h2>
            <div>
                <h2 >All Popular recipe</h2>
                
            </div>
        </div>
        
    </div>
  );
}
