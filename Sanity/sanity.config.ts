import { defineConfig, definePlugin } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './deskStructure'
import { media } from 'sanity-plugin-media'
// import { dashboardTool, projectInfoWidget } from '@sanity/dashboard'
// import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify'
import { colorInput } from '@sanity/color-input'
// import { netlifyTool } from '@akcybex/sanity-netlify-tool'
// import '@akcybex/sanity-netlify-tool/dist/style.css'
import { MoveToWorkspace } from './actions'
// import { croTriggersTool } from './actions/buttons'


const sharedConfig = definePlugin({
    name: 'default',
    document: {
        actions: (prev: any, context: any) => {
            return [...prev, MoveToWorkspace(context)]
        },
    },
    plugins: [
        structureTool({ structure }),
        visionTool(),
        media(),
        colorInput()

    ],
})

export default defineConfig([{
    name: 'default',
    title: 'Partrental Tailwindcss',
    basePath: '/prod',
    projectId: 'sfisgfi1',
    dataset: 'production',


    plugins: [sharedConfig()],

    schema: {
        types: schemaTypes,
    },

}])

