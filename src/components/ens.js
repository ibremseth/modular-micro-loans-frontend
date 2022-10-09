import { useEnsName} from "wagmi";

const ENSResolver = ({ address_ }) => {
    let addressString = address_.toString();
    let shortenedAddress = addressString.substring(0, 6) + "..." + addressString.substring(addressString.length - 4, addressString.length);
    const { data, isError, isLoading } = useEnsName({
        address: address_,
    });

    if (!data || isLoading || isError) {
        return (<p>Creator: {shortenedAddress}</p>);
    }
    return <p>Creator: {data}</p>
}

export default ENSResolver
