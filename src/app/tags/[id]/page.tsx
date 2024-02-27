import { Suspense } from "react";
import { type Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTagDetails } from "@/utils/apiUtils";
import BrowsePage from "@/components/BrowsePage";

type Props = {
  params: { id: string; name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getTagDetails(params.id);

  return {
    title: `DBaN - ${data.name}`,
  };
}

async function PageContent(props: { subcategory: string }) {
  const { subcategory } = props;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000, // 10 minutes
      },
    },
  });

  // await queryClient.prefetchQuery({
  //   queryKey: ["games", page, sortBy, category],
  //   queryFn: () => getGames(page, sortBy, undefined, category),
  // });

  await queryClient.prefetchQuery({
    queryKey: ["tagDetails", subcategory],
    queryFn: () => getTagDetails(subcategory),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrowsePage category="tags" subcategory={subcategory} />
    </HydrationBoundary>
  );
}

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent subcategory={id.toString()} />
    </Suspense>
  );
}
