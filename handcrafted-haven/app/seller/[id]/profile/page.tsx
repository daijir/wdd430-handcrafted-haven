import { notFound, redirect } from "next/navigation";
import { getSellerById } from "@/lib/data";
import { auth } from "@/auth";
import SellerProfileEditPage from "./SellerProfileEditPage";

type EditProfilePageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditProfilePage({ params }: EditProfilePageProps) {
    const { id } = await params;

    // Fetch seller profile data
    const seller = await getSellerById(id);
    if (!seller) {
        notFound();
    }

    // Authentication check
    const session = await auth();
    const loggedInUser = session?.user;

    // If not logged in → go to login
    if (!loggedInUser) {
        redirect("/login");
    }

    // Logged in but NOT the owner → Rickroll (very necessary)
    if (loggedInUser.id !== seller.id) {
        redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }

    // All checks passed → Show edit page
    return <SellerProfileEditPage />;
}
