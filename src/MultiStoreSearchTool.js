import React, { useState } from 'react';
import { Search, ExternalLink, ShoppingCart, Store } from 'lucide-react';

const MultiStoreSearchTool = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stores = [
    {
      name: 'Amazon',
      url: 'https://www.amazon.com/s?k=',
      logo: '📦',
      color: '#ff9500'
    },
    {
      name: 'Walmart',
      url: 'https://www.walmart.com/search?q=',
      logo: '🟡',
      color: '#0071ce'
    },
    {
      name: 'Target',
      url: 'https://www.target.com/s?searchTerm=',
      logo: '🎯',
      color: '#cc0000'
    },
    {
      name: 'Best Buy',
      url: 'https://www.bestbuy.com/site/searchpage.jsp?st=',
      logo: '🔵',
      color: '#ffdb00'
    },
    {
      name: 'eBay',
      url: 'https://www.ebay.com/sch/i.html?_nkw=',
      logo: '🏷️',
      color: '#0064d2'
    },
    {
      name: 'Newegg',
      url: 'https://www.newegg.com/p/pl?d=',
      logo: '🥚',
      color: '#e97600'
    },
    // {
    //   name: 'Home Depot',
    //   url: 'https://www.homedepot.com/s/',
    //   logo: '🏠',
    //   color: '#f96302'
    // },
    {
      name: 'Etsy',
      url: 'https://www.etsy.com/search?q=',
      logo: '🎨',
      color: '#f16521'
    },
    {
      name: 'Costco',
      url: 'https://www.costco.com/CatalogSearch?keyword=',
      logo: '🏪',
      color: '#00447c'
    },
    {
      name: 'B&H Photo',
      url: 'https://www.bhphotovideo.com/c/search?Ntt=',
      logo: '📷',
      color: '#333333'
    },
    {
      name: 'JB Hi-Fi',
      url: 'https://www.jbhifi.com.au/search?query=',
      logo: '🎵',
      color: '#e60012'
    }
  ];

  const handleStoreToggle = (storeName) => {
    if (isMobile) {
      // On mobile, only allow single selection
      setSelectedStores([storeName]);
    } else {
      // On desktop, allow multiple selection
      setSelectedStores(prev => 
        prev.includes(storeName) 
          ? prev.filter(s => s !== storeName)
          : [...prev, storeName]
      );
    }
  };

  const selectAllStores = () => {
    setSelectedStores(stores.map(store => store.name));
  };

  const clearAllStores = () => {
    setSelectedStores([]);
  };

  const openSearches = () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    if (selectedStores.length === 0) {
      alert('Please select at least one store');
      return;
    }

    const storesToSearch = selectedStores;
    
    storesToSearch.forEach(storeName => {
      const store = stores.find(s => s.name === storeName);
      if (store) {
        const searchUrl = store.url + encodeURIComponent(searchTerm);
        window.open(searchUrl, '_blank');
      }
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    wrapper: {
      maxWidth: '1000px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    subtitle: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: '18px'
    },
    searchCard: {
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      padding: '30px',
      marginBottom: '30px'
    },
    searchContainer: {
      display: 'flex',
      gap: '15px',
      marginBottom: '30px'
    },
    searchInputWrapper: {
      flex: 1,
      position: 'relative'
    },
    searchInput: {
      width: '93%',
      padding: '15px 15px 15px 45px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    searchIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    searchButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    storeHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    storeTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#374151',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    controls: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    },
    controlButton: {
      background: 'none',
      border: 'none',
      color: '#3b82f6',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      padding: '5px'
    },
    storeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '15px'
    },
    storeButton: {
      padding: '20px',
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      background: 'white',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      position: 'relative'
    },
    storeButtonSelected: {
      borderColor: '#3b82f6',
      background: '#eff6ff',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)'
    },
    storeLogo: {
      fontSize: '32px',
      marginBottom: '10px'
    },
    storeName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    selectedIndicator: {
      width: '8px',
      height: '8px',
      background: '#3b82f6',
      borderRadius: '50%',
      margin: '8px auto 0'
    },
    noSelectionNote: {
      color: '#6b7280',
      fontSize: '14px',
      textAlign: 'center',
      marginTop: '15px',
      fontStyle: 'italic'
    },
    instructionCard: {
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
      borderRadius: '15px',
      padding: '25px',
      marginBottom: '30px'
    },
    instructionTitle: {
      fontWeight: '600',
      color: '#374151',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    instructionList: {
      color: '#4b5563',
      lineHeight: '1.6'
    },
    exampleCard: {
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      padding: '25px'
    },
    exampleTitle: {
      fontWeight: '600',
      color: '#374151',
      marginBottom: '15px'
    },
    exampleGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px'
    },
    exampleButton: {
      padding: '8px 16px',
      background: '#f3f4f6',
      border: 'none',
      borderRadius: '20px',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    footer: {
      marginTop: '30px',
      textAlign: 'center',
      color: 'rgba(255,255,255,0.8)',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🛍️ Multi-Store Search Tool</h1>
          <p style={styles.subtitle}>Search across multiple shopping websites simultaneously</p>
        </div>

        {/* Search Input */}
        <div style={styles.searchCard}>
          <div style={styles.searchContainer}>
            <div style={styles.searchInputWrapper}>
              <Search style={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Enter product name (e.g., iPhone 15, wireless headphones, laptop...)"
                style={{
                  ...styles.searchInput,
                  borderColor: searchTerm ? '#3b82f6' : '#e2e8f0'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && openSearches()}
              />
            </div>
            <button
              onClick={openSearches}
              style={styles.searchButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              <ExternalLink size={20} />
              Search
            </button>
          </div>

          {/* Store Selection Controls */}
          <div style={styles.storeHeader}>
            <h3 style={styles.storeTitle}>
              <Store size={20} />
              Select Stores ({selectedStores.length} selected)
            </h3>
            <div style={styles.controls}>
              {!isMobile && (
                <>
                  <button
                    onClick={selectAllStores}
                    style={styles.controlButton}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                  >
                    Select All
                  </button>
                  <span style={{color: '#d1d5db'}}>|</span>
                </>
              )}
              <button
                onClick={clearAllStores}
                style={{...styles.controlButton, color: '#6b7280'}}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Store Grid */}
          <div style={styles.storeGrid}>
            {stores.map((store) => {
              const isSelected = selectedStores.includes(store.name);
              return (
                <button
                  key={store.name}
                  onClick={() => handleStoreToggle(store.name)}
                  style={{
                    ...styles.storeButton,
                    ...(isSelected ? styles.storeButtonSelected : {})
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.target.style.borderColor = '#9ca3af';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={styles.storeLogo}>{store.logo}</div>
                  <div style={styles.storeName}>{store.name}</div>
                  {isSelected && <div style={styles.selectedIndicator}></div>}
                </button>
              );
            })}
          </div>

          {selectedStores.length === 0 && (
            <p style={styles.noSelectionNote}>
              💡 {isMobile ? 'Select one store to search' : 'Select stores to search (or use Select All)'}
            </p>
          )}
        </div>

        {/* Instructions */}
        <div style={styles.instructionCard}>
          <h3 style={styles.instructionTitle}>
            <ShoppingCart size={20} />
            How it works:
          </h3>
          <div style={styles.instructionList}>
            <p style={{margin: '5px 0'}}>1. Enter your search term in the box above</p>
            <p style={{margin: '5px 0'}}>2. Select which stores you want to search</p>
            <p style={{margin: '5px 0'}}>3. Click "Search" to open tabs for each selected store</p>
            <p style={{margin: '5px 0'}}>4. Compare prices across all open tabs manually</p>
            <p style={{
              marginTop: '15px',
              fontSize: '12px',
              fontStyle: 'italic',
              color: '#6b7280',
              borderTop: '1px solid #d1d5db',
              paddingTop: '10px'
            }}>
              P.S. Ensure that your browser's pop-up blocker is disabled for this site to allow search results to open in new tabs
            </p>
          </div>
        </div>

        {/* Quick Search Examples */}
        {/* <div style={styles.exampleCard}>
          <h3 style={styles.exampleTitle}>Quick Search Examples:</h3>
          <div style={styles.exampleGrid}>
            {[
              'iPhone 15 Pro',
              'MacBook Air',
              'Sony WH-1000XM5',
              'Nintendo Switch',
              'Air Fryer',
              'Coffee Maker',
              'Wireless Earbuds',
              'Gaming Chair'
            ].map((example) => (
              <button
                key={example}
                onClick={() => setSearchTerm(example)}
                style={styles.exampleButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                {example}
              </button>
            ))}
          </div>
        </div> */}

        {/* Footer */}
        <div style={styles.footer}>
          <p>⚡ Opens real search results in new tabs - no fake data, just direct access to actual stores</p>
        </div>
      </div>
    </div>
  );
};

export default MultiStoreSearchTool;