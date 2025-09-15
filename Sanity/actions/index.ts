import { useState } from 'react'
import { useToast } from '@sanity/ui'
import { SyncIcon } from '@sanity/icons'
import { createClient } from '@sanity/client'

export function MoveToWorkspace(context: any) {
    const client = context.getClient({
        dataset: context.dataset === 'development' ? 'production' : 'development',
        apiVersion: '2022-11-29',
    })
    return (props: any) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [syncing, setSyncing] = useState(false)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const toast = useToast()

        const getReferencedImages = (doc: any) => {
            // Extract image references from the document
            const refs: any[] = []
            if (doc) {
                JSON.stringify(doc, (key: any, value: any) => {
                    if (key === '_ref' && value.startsWith('image-')) {
                        refs.push(value)
                    }
                    return value
                })
            }
            return refs
        }

        const checkForMissingImages = async (imageIds: any) => {
            // Check if images exist in the target dataset
            const missingImages = []
            for (const imageId of imageIds) {
                try {
                    const imageDoc = await client.getDocument(imageId)
                    if (!imageDoc) {
                        missingImages.push(imageId)
                    }
                } catch (err: any) {
                    missingImages.push(imageId)
                }
            }
            return missingImages
        }



        const fetchImageFromSourceDataset = async (imageId: any) => {


            const sanityClient = createClient({
                projectId: context.projectId,
                dataset: context.dataset,
                useCdn: true,
                apiVersion: '2022-11-29',
            })

            // Fetch the image asset using a GROQ query
            const query = `*[_id == $imageId][0]`
            const params = { imageId }

            try {
                const imageDoc = await sanityClient.fetch(query, params)

                // console.log(imageId, imageDoc)
                if (!imageDoc) {
                    //   console.log(`Image document with ID ${imageId} not found in the source dataset.`)
                    return null
                }
                return imageDoc
            } catch (err) {
                console.error('Error fetching the image document:', err)
                return null
            }
        }

        const syncDocumentWithReferences = async (doc: any) => {
            const referencedImageIds = getReferencedImages(doc)
            //   console.log('Referenced Image Ids ===> ', referencedImageIds)
            const missingImages = await checkForMissingImages(referencedImageIds)
            //   console.log('Missing Images ===> ', missingImages)

            // If any images are missing, upload them to the target dataset
            for (const imageId of missingImages) {
                const imageDoc = await fetchImageFromSourceDataset(imageId)
                // console.log(imageDoc)
                if (imageDoc) {
                    await client.createOrReplace(imageDoc)
                }
            }

            // Sync the main document after syncing references
            await client.createOrReplace(doc)
        }

        return {
            icon: SyncIcon,
            label:
                `${syncing ? 'Syncing' : 'Sync'} with ` +
                (context.dataset === 'development' ? 'production' : 'development'),
            onHandle: async () => {
                setSyncing(true)

                try {
                    const documentToSync = props.published || props.draft
                    await syncDocumentWithReferences(documentToSync)

                    toast.push({
                        status: 'success',
                        title: 'Document and referenced images synced successfully.',
                    })
                } catch (err: any) {
                    console.error(err)
                    toast.push({
                        status: 'error',
                        title: 'Error syncing document.',
                        description: err instanceof Error ? err.message : 'Unknown error',
                    })
                } finally {
                    props.onComplete()
                    setSyncing(false)
                }
            },
        }
    }
}
