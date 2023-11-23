import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_COLLECTION } from "../utils/mutations";
import { Button } from "react-bootstrap";

const DeleteCollectionButton = ({ collectionId }) => {

    const [ deleteCollection, {error}] = useMutation(DELETE_COLLECTION)
    console.log(collectionId)
    const handleDelete = () => {
        const { data } = deleteCollection({
            variables: {
                collectionId
            }
        })
    }

    return (
        <div>
            <Button onClick={() => handleDelete()} >Delete Collection</Button>
        </div>
    )
}

export default DeleteCollectionButton;