import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_COLLECTION } from "../utils/mutations";
import { Button } from "react-bootstrap";

const DeleteCollectionButton = ({ collectionId }) => {

    const [ deleteCollection, {error}] = useMutation(DELETE_COLLECTION)

    const handleDelete = () => {
        const { data } = deleteCollection({
            variables: {
                _id: collectionId
            }
        })
    }

    return (

        <div>
            <Button onClick={() => deleteCollection()} />
        </div>
    )
}

export default DeleteCollectionButton;