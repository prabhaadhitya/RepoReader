
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="text-white bg-[#020817]">
      {children}
    </main>
  );
}