export default function DashDetailPage({
  params,
  searchParams,
}) {
  console.log(params);
  return <main>DashDetailPage - {params.id} {searchParams.code}</main>;
}