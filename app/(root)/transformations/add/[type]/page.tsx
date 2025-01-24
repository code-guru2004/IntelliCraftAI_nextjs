
import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "@/constants";
import TransformationForm from "@/components/shared/TransformationForm";


import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server'

interface SearchParamProps {
  params: {
    id: string; 
    type: TransformationTypeKey; 
  };
}
const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const transformation = transformationTypes[type];
  const { userId } = await auth()
  
  if(!userId) redirect('/sign-in') 
  const userDetails = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
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
}

export default AddTransformationTypePage