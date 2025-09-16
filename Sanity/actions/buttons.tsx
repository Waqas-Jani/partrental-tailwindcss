import {Button, Card, Stack, Text, Checkbox} from '@sanity/ui'
import {DashboardIcon} from '@sanity/icons' // For the tool icon
import {useEffect, useState} from 'react'
import {useClient} from 'sanity'

const CroTriggersComponent = () => {
  const [documents, setDocuments] = useState({
    singlePages: [
      {_id: 'home', title: 'Home', slug: {current: ''}, _type: 'home'},
      {_id: 'about', title: 'About', slug: {current: 'about'}, _type: 'about'},
      {_id: 'rent', title: 'Rent', slug: {current: 'rent'}, _type: 'rent'},
      {_id: 'services', title: 'Services', slug: {current: 'services'}, _type: 'services'},
    ],
    locations: [],
    landingPages: [],
    locationServices: [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedDocuments, setSelectedDocuments] = useState<any[]>([])
  const [openSelects, setOpenSelects] = useState({
    singlePages: false,
    locations: false,
    landingPages: false,
  })
  const client = useClient()

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const [locations, landingPages, locationServices] = await Promise.all([
          client.fetch(
            '*[_type == "location"]{_id, title, slug, _type,  "locationServices": locationServices[]->{_id, title, slug, _type}}',
          ),
          client.fetch('*[_type == "landingPage"]{_id, pageTitle, slug, _type}'),
          client.fetch('*[_type == "locationService"]{_id, title, slug, _type}'),
        ])

        setDocuments((prev) => ({
          ...prev,
          locations: locations || [],
          landingPages: landingPages || [],
          locationServices: locationServices || [],
        }))
      } catch (error) {
        // Error handling without console.log
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [client])

  const handleDocumentToggle = (document: any) => {
    const isSelected = selectedDocuments.some((doc) => doc._id === document._id)

    if (isSelected) {
      // Remove document if already selected
      setSelectedDocuments(selectedDocuments.filter((doc) => doc._id !== document._id))
    } else {
      // Add document if not selected and under limit
      if (selectedDocuments.length < 10) {
        setSelectedDocuments([...selectedDocuments, document])
      }
    }
  }

  const isDocumentSelected = (document: any) => {
    return selectedDocuments.some((doc) => doc._id === document._id)
  }

  const isSelectionDisabled = (document: any) => {
    return !isDocumentSelected(document) && selectedDocuments.length >= 10
  }

  const toggleSelect = (selectType: any) => {
    setOpenSelects((prev) => {
      // Close all other select boxes first
      const newState = {
        singlePages: false,
        locations: false,
        landingPages: false,
      }
      // Only open the clicked one, close others
      newState[selectType as keyof typeof newState] = !prev[selectType as keyof typeof prev]
      return newState
    })
  }

  // Close all select boxes
  const closeAllSelects = () => {
    setOpenSelects({
      singlePages: false,
      locations: false,
      landingPages: false,
    })
  }

  // Handle click outside to close select boxes
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if click is outside any select box
      const isOutsideSelectBox = !event.target.closest('[data-select-box]')
      if (isOutsideSelectBox) {
        closeAllSelects()
      }
    }

    // Add event listener if any select box is open
    if (Object.values(openSelects).some((isOpen) => isOpen)) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openSelects])

  const getSelectedCount = (items: any) => {
    if (items === documents.locations) {
      // For locations, count both locations and their nested services
      let count = 0
      items.forEach((location: any) => {
        if (isDocumentSelected(location)) count++
        if (location.locationServices) {
          location.locationServices.forEach((service: any) => {
            if (isDocumentSelected(service)) count++
          })
        }
      })
      return count
    }
    // For other document types, use the original logic
    return items.filter((item: any) => isDocumentSelected(item)).length
  }

  const DocumentSelectBox = ({title, items, type, selectKey}: any) => {
    const selectedCount = getSelectedCount(items)
    const isOpen = openSelects[selectKey as keyof typeof openSelects]

    // Special handling for locations to show nested locationServices
    const renderLocationItems = () => {
      return items.map((location: any) => (
        <div key={location._id}>
          {/* Location item */}
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #f7fafc',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: isDocumentSelected(location) ? '#ebf8ff' : '#ffffff',
              transition: 'background-color 0.2s ease',
            }}
            onClick={() => handleDocumentToggle(location)}
            onMouseEnter={(e: any) => {
              if (!isDocumentSelected(location)) {
                e.target.style.backgroundColor = '#f7fafc'
              }
            }}
            onMouseLeave={(e: any) => {
              if (!isDocumentSelected(location)) {
                e.target.style.backgroundColor = '#ffffff'
              }
            }}
          >
            <Checkbox
              checked={isDocumentSelected(location)}
              onChange={() => handleDocumentToggle(location)}
              disabled={isSelectionDisabled(location)}
            />
            <span
              style={{
                fontSize: '13px',
                color: '#2d3748',
                flex: 1,
                fontWeight: isDocumentSelected(location) ? '500' : '400',
              }}
            >
              {location.title}
              <span
                style={{
                  color: '#718096',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  backgroundColor: '#f7fafc',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '8px',
                }}
              >
                /{location.slug.current}
              </span>
            </span>
          </div>

          {/* Nested Location Services */}
          {location.locationServices && location.locationServices.length > 0 && (
            <div style={{paddingLeft: '24px', backgroundColor: '#fafbfc'}}>
              {location.locationServices.map((service: any) => (
                <div
                  key={service._id}
                  style={{
                    padding: '8px 16px',
                    borderBottom: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: isDocumentSelected(service) ? '#ebf8ff' : '#fafbfc',
                    transition: 'background-color 0.2s ease',
                  }}
                  onClick={() => handleDocumentToggle(service)}
                  onMouseEnter={(e: any) => {
                    if (!isDocumentSelected(service)) {
                      e.target.style.backgroundColor = '#f1f5f9'
                    }
                  }}
                  onMouseLeave={(e: any) => {
                    if (!isDocumentSelected(service)) {
                      e.target.style.backgroundColor = '#fafbfc'
                    }
                  }}
                >
                  <Checkbox
                    checked={isDocumentSelected(service)}
                    onChange={() => handleDocumentToggle(service)}
                    disabled={isSelectionDisabled(service)}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#4a5568',
                      flex: 1,
                      fontWeight: isDocumentSelected(service) ? '500' : '400',
                    }}
                  >
                    {service.title}
                    <span
                      style={{
                        color: '#718096',
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        backgroundColor: '#f1f5f9',
                        padding: '1px 4px',
                        borderRadius: '3px',
                        marginLeft: '6px',
                      }}
                    >
                      /{location.slug.current}/{service.slug.current}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))
    }

    return (
      <Card
        padding={3}
        radius={2}
        tone="default"
        style={{
          marginBottom: '1rem',
          backgroundColor: '#fafbfc',
          border: '1px solid #e1e5e9',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <Text
          size={1}
          weight="semibold"
          style={{
            marginBottom: '0.75rem',
            color: '#2d3748',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {title} ({items.length} available)
        </Text>
        {items.length > 0 ? (
          <div style={{position: 'relative'}} data-select-box>
            {/* Select Box Button */}
            <div
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 16px',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '44px',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderColor: isOpen ? '#3182ce' : '#e2e8f0',
              }}
              onClick={() => toggleSelect(selectKey)}
              onMouseEnter={(e: any) => {
                e.target.style.borderColor = '#3182ce'
                e.target.style.boxShadow = '0 4px 12px rgba(49,130,206,0.15)'
              }}
              onMouseLeave={(e: any) => {
                if (!isOpen) {
                  e.target.style.borderColor = '#e2e8f0'
                  e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
                }
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: selectedCount > 0 ? '#2d3748' : '#718096',
                  fontWeight: selectedCount > 0 ? '500' : '400',
                }}
              >
                {selectedCount > 0
                  ? `${selectedCount} document${selectedCount > 1 ? 's' : ''} selected`
                  : 'Select documents...'}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  color: '#718096',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  fontWeight: 'bold',
                }}
              >
                ▼
              </span>
            </div>

            {/* Dropdown Options */}
            {isOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  border: '2px solid #3182ce',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  backgroundColor: '#ffffff',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  marginTop: '-2px',
                }}
              >
                {selectKey === 'locations'
                  ? renderLocationItems()
                  : items.map((item: any, index: any) => (
                      <div
                        key={item._id}
                        style={{
                          padding: '12px 16px',
                          borderBottom: index < items.length - 1 ? '1px solid #f7fafc' : 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          backgroundColor: isDocumentSelected(item) ? '#ebf8ff' : '#ffffff',
                          transition: 'background-color 0.2s ease',
                          borderRadius: index === 0 ? '0' : '0',
                        }}
                        onClick={() => handleDocumentToggle(item)}
                        onMouseEnter={(e: any) => {
                          if (!isDocumentSelected(item)) {
                            e.target.style.backgroundColor = '#f7fafc'
                          }
                        }}
                        onMouseLeave={(e: any) => {
                          if (!isDocumentSelected(item)) {
                            e.target.style.backgroundColor = '#ffffff'
                          }
                        }}
                      >
                        <Checkbox
                          checked={isDocumentSelected(item)}
                          onChange={() => handleDocumentToggle(item)}
                          disabled={isSelectionDisabled(item)}
                        />
                        <span
                          style={{
                            fontSize: '13px',
                            color: '#2d3748',
                            flex: 1,
                            fontWeight: isDocumentSelected(item) ? '500' : '400',
                          }}
                        >
                          {item.title || item.pageTitle}
                          <span
                            style={{
                              color: '#718096',
                              fontSize: '11px',
                              fontFamily: 'monospace',
                              backgroundColor: '#f7fafc',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              marginLeft: '8px',
                            }}
                          >
                            /{item.slug.current}
                          </span>
                        </span>
                      </div>
                    ))}
              </div>
            )}
          </div>
        ) : (
          <Text
            size={0}
            muted
            style={{
              fontStyle: 'italic',
              textAlign: 'center',
              padding: '20px',
              color: '#a0aec0',
            }}
          >
            No {type} documents found
          </Text>
        )}
      </Card>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f7fafc',
      }}
    >
      <Card
        padding={4}
        style={{
          minHeight: 'auto',
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0',
        }}
      >
        <Stack space={3}>
          {/* Header */}
          <div
            style={{
              textAlign: 'center',
              padding: '0 0 1.5rem 0',
              borderBottom: '2px solid #f7fafc',
            }}
          >
            <Text
              size={2}
              weight="bold"
              style={{
                color: '#1a202c',
                fontSize: '20px',
                marginBottom: '0.75rem',
              }}
            >
              🚀 CRO Workflow Triggers
            </Text>
            <Text
              size={0}
              muted
              style={{
                color: '#718096',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              Select up to 10 documents for analysis and optimization
            </Text>
          </div>

          {/* Selection Status */}
          <Card
            padding={3}
            radius={2}
            tone={selectedDocuments.length > 0 ? 'positive' : 'default'}
            style={{
              backgroundColor: selectedDocuments.length > 0 ? '#f0fff4' : '#f7fafc',
              border: selectedDocuments.length > 0 ? '1px solid #9ae6b4' : '1px solid #e2e8f0',
              textAlign: 'center',
            }}
          >
            <Text
              size={1}
              weight="bold"
              style={{
                color: selectedDocuments.length > 0 ? '#22543d' : '#4a5568',
                fontSize: '14px',
              }}
            >
              {selectedDocuments.length > 0 ? '✅ ' : '📋 '}
              Selected: {selectedDocuments.length}/10
            </Text>
            {selectedDocuments.length > 0 && (
              <Text
                size={0}
                muted
                style={{
                  color: '#718096',
                  marginTop: '0.5rem',
                  fontSize: '12px',
                  lineHeight: '1.4',
                  fontStyle: 'italic',
                }}
              >
                {selectedDocuments.map((doc: any) => doc.title || doc.pageTitle).join(', ')}
              </Text>
            )}
          </Card>

          {/* Document Selection Boxes */}
          {loading ? (
            <Card
              padding={4}
              radius={2}
              style={{
                textAlign: 'center',
                backgroundColor: '#f7fafc',
                border: '1px solid #e2e8f0',
              }}
            >
              <Text
                size={0}
                muted
                style={{
                  color: '#718096',
                  fontSize: '13px',
                }}
              >
                ⏳ Loading documents...
              </Text>
            </Card>
          ) : (
            <>
              <DocumentSelectBox
                title="Single Pages"
                items={documents.singlePages}
                type="single page"
                selectKey="singlePages"
              />
              <DocumentSelectBox
                title="Locations"
                items={documents.locations}
                type="location"
                selectKey="locations"
              />
              <DocumentSelectBox
                title="Landing Pages"
                items={documents.landingPages}
                type="landing page"
                selectKey="landingPages"
              />
            </>
          )}

          {/* Buttons */}
          <Stack space={3} style={{marginTop: '1.5rem'}}>
            <Button
              mode="default"
              tone="primary"
              textAlign="center"
              size={2}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 24px',
                fontSize: '15px',
                fontWeight: '700',
                boxShadow: '0 8px 25px rgba(102,126,234,0.4)',
                transition: 'all 0.3s ease',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden',
              }}
              disabled={selectedDocuments.length === 0}
              onClick={async () => {
                try {
                  // Get current date and 7 days before
                  const endDate = new Date()
                  const startDate = new Date(endDate)
                  startDate.setDate(startDate.getDate() - 7)

                  // Format dates as YYYY-MM-DD
                  const formattedStartDate = startDate.toISOString().split('T')[0]
                  const formattedEndDate = endDate.toISOString().split('T')[0]

                  // Use selected documents instead of hardcoded pages
                  const pages_urls = selectedDocuments.map((doc: any) => {
                    if (doc._type === 'locationService') {
                      // For location services, find the parent location
                      const parentLocation = documents.locations.find(
                        (loc: any) =>
                          loc.locationServices &&
                          loc.locationServices.some((service: any) => service._id === doc._id),
                      )
                      if (parentLocation && (parentLocation as any)?.slug && (parentLocation as any)?.slug.current) {
                        return `/${(parentLocation as any).slug.current}/${doc?.slug?.current}`
                      }
                    }
                    // Default case for other document types
                    return doc.slug && doc?.slug?.current ? `/${doc.slug.current}` : '/'
                  })
                  console.log(pages_urls)

                  const response = await fetch(
                    `https://civsavteam.app.n8n.cloud/webhook/cro-start`,
                    {
                      method: 'POST',
                      body: JSON.stringify({
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        pages_urls: pages_urls,
                        // selectedDocuments: selectedDocuments.map((doc) => ({
                        //   _id: doc._id,
                        //   title: doc.title || doc.pageTitle,
                        //   slug: doc.slug?.current,
                        //   type: doc._type,
                        // })),
                      }),
                    },
                  )
                  if (response.ok) {
                    // Success handling without alert
                  } else {
                    // Error handling without alert
                  }
                } catch (error: any) {
                  // Error handling without console.log or alert
                }
              }}
              onMouseEnter={(e: any) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 12px 35px rgba(102,126,234,0.5)'
              }}
              onMouseLeave={(e: any) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 8px 25px rgba(102,126,234,0.4)'
              }}
            >
              🎯 Start Baseline Analysis ({selectedDocuments.length})
            </Button>

            <Button
              mode="default"
              tone="primary"
              textAlign="center"
              size={2}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 24px',
                fontSize: '15px',
                fontWeight: '700',
                boxShadow: '0 8px 25px rgba(240,147,251,0.4)',
                transition: 'all 0.3s ease',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden',
              }}
              disabled={selectedDocuments.length === 0}
              onClick={async () => {
                try {
                  // Generate pages_urls with location prefix for location services
                  const pages_urls = selectedDocuments.map((doc: any) => {
                    if (doc._type === 'locationService') {
                      // For location services, find the parent location
                      const parentLocation = documents.locations.find(
                        (loc: any) =>
                          loc.locationServices &&
                          loc.locationServices.some((service: any) => service._id === doc._id),
                      )
                      if (parentLocation && (parentLocation as any).slug && (parentLocation as any).slug.current) {
                        return `/${(parentLocation as any).slug.current}/${doc.slug.current}`
                      }
                    }
                    // Default case for other document types
                    return doc.slug && doc.slug.current ? `/${doc.slug.current}` : '/'
                  })

                  await fetch('YOUR_ZAPIER_POSTTEST_URL', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      triggerType: 'postTest',
                      notes: 'Optional notes here',
                      pages_urls: pages_urls,
                      selectedDocuments: selectedDocuments.map((doc: any) => ({
                        _id: doc._id,
                        title: doc.title || doc.pageTitle,
                        slug: doc.slug?.current,
                        type: doc._type,
                      })),
                    }), // Customize payload
                  })
                  // Success handling without alert
                } catch (error: any) {
                  // Error handling without alert
                }
              }}
              onMouseEnter={(e: any) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 12px 35px rgba(240,147,251,0.5)'
              }}
              onMouseLeave={(e: any) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 8px 25px rgba(240,147,251,0.4)'
              }}
            >
              📊 Start Post-Test Analysis ({selectedDocuments.length})
            </Button>
          </Stack>
        </Stack>
      </Card>
    </div>
  )
}

export const croTriggersTool = () => ({
  title: 'CRO Triggers', // Name in the menu bar
  name: 'cro-triggers', // URL segment: e.g., /cro-triggers
  icon: DashboardIcon, // Optional icon

  component: CroTriggersComponent,
})
