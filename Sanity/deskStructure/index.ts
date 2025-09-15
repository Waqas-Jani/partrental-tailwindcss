import type { StructureResolver, StructureBuilder } from 'sanity/structure'
import { FolderIcon, CogIcon, HomeIcon } from '@sanity/icons'

const singletonListItem = (S: StructureBuilder, typeName: string, title?: string) =>
    S.listItem()
        .title(title || typeName)
        .id(typeName)
        .child(S.document().schemaType(typeName).documentId(typeName))

const singletonIds = [
    'sitesettings',
    'homePage',
    'rentPage',
    'servicesPage',
    'usedProductsPage',
    'newProductsPage',
    'faqPage',
    'aboutPage',
    'contactPage',
    'blogPage',
    'downloadPage',
    'accountAccess',
]

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            singletonListItem(S, 'sitesettings', 'Settings').icon(CogIcon),
            singletonListItem(S, 'homePage', 'Home Page').icon(HomeIcon),
            S.divider(),
            singletonListItem(S, 'rentPage', 'Rent Page').icon(FolderIcon),
            singletonListItem(S, 'faqPage', 'FAQ Page').icon(FolderIcon),
            singletonListItem(S, 'servicesPage', 'Services Page').icon(FolderIcon),
            singletonListItem(S, 'contactPage', 'Contact Page').icon(FolderIcon),
            singletonListItem(S, 'aboutPage', 'About Page').icon(FolderIcon),
            singletonListItem(S, 'usedProductsPage', 'Used Page').icon(FolderIcon),
            singletonListItem(S, 'newProductsPage', 'New Page').icon(FolderIcon),
            singletonListItem(S, 'blogPage', 'Blog Page').icon(FolderIcon),
            singletonListItem(S, 'downloadPage', 'Download Page').icon(FolderIcon),
            singletonListItem(S, 'accountAccess', 'Account Access Page').icon(FolderIcon),
            S.divider(),

            // Other document types excluding singletons
            ...S.documentTypeListItems().filter((listItem) => {
                const id = listItem.getId()
                return typeof id === 'string' && !singletonIds.includes(id)
            }),
        ])
