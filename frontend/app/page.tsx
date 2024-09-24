import Auth from "@/components/auth/auth.component";
import Beers from "@/components/beers/beers.component";
import Customers from "@/components/customers/customers.component";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Auth/>

            <Beers />
            <Customers />
        </div>
    );
}
