import { DashboardHeader } from "app/components/header";
import CommunitiesList from "./components/CommunitiesList";
import Create from "./components/create-community-form";
import { Suspense } from 'react';
import Loader from "./components/communityLoader";

export const metadata = {
  title: "Communities",
};

export default async function Community() {
  return (
    <div className="container mt-5">
      <div className="text-foreground flex justify-between">
        <DashboardHeader
          heading="Communities"
          text="Follow communities that suit you"
        />
        <Create />
      </div>
      <div className="mt-4">
        <Suspense fallback={<Loader />}>
          <CommunitiesList />
        </Suspense>
      </div>
    </div>
  );
}
