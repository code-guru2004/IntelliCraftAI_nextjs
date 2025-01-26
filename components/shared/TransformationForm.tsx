"use client";
import React, { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Input } from "@/components/ui/input";
import { aspectRatioOptions, defaultValues, transformationTypes } from "@/constants";
import { CustomField } from "./CustomField";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";

export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color:z.string().optional(),
    prompt:z.string().optional(),
    publicId: z.string(),
});

function TransformationForm({action  , data = null , userId , type , creditBalance , config = null} : TransformationFormProps) {

  const transformationType = transformationTypes[type];
  const [Iamge, setIamge] = useState(data)

  const [isSubmittimg, setIsSubmittimg] = useState(false) //for the submit button
  const [isTransforming, setIsTransforming] = useState(false)
  const [transformationConfig, setTransformationConfig] = useState(config)

  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)

  const [isPending , startTransition] = useTransition()

    const initialValues= data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } : defaultValues
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const onSelectFieldHandler = (value:string , onChangeField:(value:string)=> void) =>{
    //For the select field
    const imageSize = aspectRatioOptions[value as AspectRatioKey]

    setIamge((prevState: any) => ({
        ...prevState,
        aspectRatio: imageSize.aspectRatio,
        width: imageSize.width,
        height : imageSize.height,
    }))

    setNewTransformation(transformationType.config);
    return onChangeField(value)
  }

  const onInputChangeHandler= (fieldName: string , value: string, type: string , onChangeField: (value: string )=> void) =>{
    debounce(()=>{
      setNewTransformation((prevState : any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to'] : value
        }
      }))

      return onChangeField(value)
    },1000);
  }

  const onTransformHandler = async ()=>{
    setIsTransforming(true)
    setTransformationConfig(
      deepMergeObjects(newTransformation , transformationConfig)
    )

    setNewTransformation(null)
    startTransition( async()=>{
      //await updateCredits(userId,creditFee)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value)=> onSelectFieldHandler(value,field.onChange)}
              >
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {
                    Object.keys(aspectRatioOptions).map((option)=>(
                      <SelectItem key={option} value={option} className="select-item">{aspectRatioOptions[option as AspectRatioKey].label}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            )}
          />
        )}

        {
          (type === "remove" || type === "recolor") && (
            <div className="prompt-field">
              <CustomField 
                control={form.control}
                name="prompt"
                formLabel={
                  type === "remove" ? "Object To Remove" : "Object To Recolor"
                }
                className="w-full"
                render={({field})=>(
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={(e)=> onInputChangeHandler(
                      'prompt',
                      e.target.value, // Text in the Input field
                      type, // either "Remove" or "Recolor"
                      field.onChange //function
                    )}
                  />
                )}
              />

              {
                type === "recolor" && (
                  <CustomField 
                    control={form.control}
                    name="color"
                    formLabel="Replace Color"
                    className="w-full"
                    render={({field}) => (
                      <Input 
                      value={field.value}
                      className="input-field"
                      onChange={(e)=> onInputChangeHandler(
                        'color',
                        e.target.value, // Text in the Input field
                        'recolor', // either "Remove" or "Recolor"
                        field.onChange //function
                      )}
                      />
                    )}
                  />

                )
              }
            </div>
          )
        }
        <div className="flex flex-col gap-4">
            <Button 
              type="button"
              className="submit-button capitalize"
              disabled={isTransforming || newTransformation === null}
              onClick={onTransformHandler}
            >
              {
                isTransforming ? 'Transforming...' : 'Apply transformation'
              }
            </Button>


            <Button 
              type="submit"
              className="submit-button capitalize"
              disabled={isSubmittimg}
            >
              {
                isSubmittimg ? 'Submitting...' : 'Save Image'
              }
            </Button>
        </div>

      </form>
    </Form>
  );
}

export default TransformationForm;
