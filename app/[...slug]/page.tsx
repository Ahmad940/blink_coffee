import BlinkMeView from "@/views/BlinkMeView";

export default function Page({ params }:any) {
    return <BlinkMeView slug={params.slug} />
  }
  