export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  return (
    <div classname="border-2 border-dashed p-4 m-4">
      <div className="flex justify-between items-center">
        <Link href="/blog">About</Link>
        <Link href="/dashboard/settings">Settings</Link>
      </div>
      <h1>Blog Layout</h1>
      {children}
    </div>
  );
}
