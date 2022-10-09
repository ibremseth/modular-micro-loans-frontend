import { useEnsName} from "wagmi";

const ENSResolver = ({ address_ }) => {
    let addressString = address_.toString();
    const { data, isError, isLoading } = useEnsName({
        address: address_,
    });

    if (!data || isLoading || isError) {
        return (<p>Creator: {addressString.substring(0, 6)}</p>);
    }
    return <p>Creator: {data}</p>
}

export default ENSResolver