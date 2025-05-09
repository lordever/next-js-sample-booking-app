import React from 'react';

export default function DocsPage({ params }: { params: { slug?: string[] } }) {
  const path = params.slug?.join('/') || '';
  const isRoot = !params.slug || params.slug.length === 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Docs</h1>

      {isRoot ? (
        <p>Welcome to docs</p>
      ) : (
        <>
          <p>
            You navigated to: <strong>{path}</strong>
          </p>
        </>
      )}
    </div>
  );
}
