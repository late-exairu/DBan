import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTags } from "@/utils/apiUtils";
import BrowseList from "@/_components/BrowseList";

export default async function page() {
  const queryKey = "tags";
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000, // 10 minutes
      },
    },
  });

  await queryClient.fetchQuery({
    queryKey: [queryKey],
    queryFn: getTags,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative flex w-full flex-col">
        <h3 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
          Tags
        </h3>

        <BrowseList queryKey={queryKey} />
      </main>
    </HydrationBoundary>
  );
}
