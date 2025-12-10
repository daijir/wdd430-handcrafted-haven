import { notFound, redirect } from "next/navigation";
import { getSellerById } from "@/lib/data";
import { auth } from "@/auth";
import SellerProfileEditPage from "./SellerProfileEditPage"; 

type EditProfilePageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditProfilePage({ params }: EditProfilePageProps) {
    const { id } = await params;

    const seller = await getSellerById(id);
    if (!seller) {
        notFound();
    }

    const session = await auth();
    const loggedInUser = session?.user;

    // Redirect to login
    if (!loggedInUser) {
        redirect("/login");
    }

    // Logged in but NOT the owner
    if (loggedInUser.id !== seller.id) {
        redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }
    return <SellerProfileEditPage />;
}
