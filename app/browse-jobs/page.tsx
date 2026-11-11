
import React from 'react';

const BrowseJobPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const search = await searchParams;

  const urlSearch = new URLSearchParams();

  Object.entries(search).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlSearch.set(key, value);
    }
  });

  const query = urlSearch.toString();

  console.log('search params:', query);

  return (
    <div>
      ami
    </div>
  );
};

export default BrowseJobPage;
