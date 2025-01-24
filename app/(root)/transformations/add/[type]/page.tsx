import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "@/constants";
import TransformationForm from "@/components/shared/TransformationForm";

import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server';

interface SearchParamProps {
  params: {
    id: string;
    type: TransformationTypeKey;
  };
}

const AddTransformationTypePage: React.FC<SearchParamProps> = async ({ params: { type } }) => { 
  // Note: The async keyword is moved to the component definition

  const { userId } = await auth()
  const transformation = transformationTypes[type];
  if(!userId) redirect('/sign-in') 
  const userDetails = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformationTypes[type].title} 
        subtitle={transformationTypes[type].subTitle} 
      />

      <section className="mt-10">
        <TransformationForm
          action="Add" 
          userId={userDetails._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={userDetails.creditBalance}
        />
      </section>
    </>
  )
};

export default AddTransformationTypePage;