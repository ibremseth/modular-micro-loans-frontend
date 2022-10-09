import {
  Chip,
} from "@mui/material";
import { useEnsName} from "wagmi";

const ENSResolver = ({ address_ }) => {
    let addressString = address_.toString();
    let shortenedAddress = addressString.substring(0, 6) + "..." + addressString.substring(addressString.length - 4, addressString.length);
    const { data, isError, isLoading } = useEnsName({
        address: address_,
    });

    if (!data || isLoading || isError) {
        let chipLabel = "Creator: " + shortenedAddress;
        return (<Chip label={chipLabel} variant="outlined" href=""></Chip>);
    }
    let chipLabel = "Creator: " + data;
    return (<Chip label={chipLabel} variant="outlined"></Chip>);
}

export default ENSResolver
