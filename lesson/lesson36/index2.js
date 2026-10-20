function User({ userId }) {
  const [name, setName] = useState({});

  useEffect(() => {
    console.log(name);
    console.log(userId);
  }, [name, userId]);
}
