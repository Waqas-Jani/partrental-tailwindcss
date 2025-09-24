import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    api: {
        projectId: 'sfisgfi1',
        dataset: 'production'
    },
    studioHost: "template-taildwind",
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
})
