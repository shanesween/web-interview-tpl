export function formatEventData(data) {
  return data.results.map(result => ({
    id: result.id,
    image: result.performers && result.performers.length > 0 ? result.performers[0].images.small : '',
    title: result.name,
    subtitle: result.venue ? result.venue.name : ''
  }));
}

export function formatPerformerData(data) {
  return data.results.map(result => ({
    id: result.id,
    image: result.images && result.images.small,
    title: result.name,
    subtitle: result.category
  }));
}

export function formatVenueData(data) {
  return data.results.map(result => ({
    id: result.id,
    image: result.images && result.images.small,
    title: result.name,
    subtitle: result.city
  }));
}

const resultCreators = {
  events: (item) => {
    const performer = item.performers.find(p => p.primary) || item.performers[0];
    return {
      image: performer.hero_image_url,
      title: item.event.name,
      subtitle: item.venue.name
    };
  },
  venues: (item) => {
    return {
      image: item.image_url,
      title: item.name,
      subtitle: item.city
    };
  },
  performers: (item) => {
    return {
      image: item.hero_image_url,
      title: item.name,
      subtitle: item.category
    };
  }
};

export function sortResults(data) {
  const {display_groups, ...resultss} = data 
  const groups = [...display_groups].sort((a, b) => {
    return a.sort_order - b.sort_order;
  });

  let items = [];
  groups.forEach(group => {
  if (group.slug === 'top_pick') {
      const results = Object.values(resultss).flat();
      const topPicks = results?.filter(item =>  item?.meta?.display_group === 'top_pick')
       items = [...items, ...topPicks]
       
  } else {
    items = [...items, ...data[group.slug]]
  }
  });

  const results = items.map(item => {
    const resultCreator = resultCreators[item?.meta?.display_group] || resultCreators['events'];
    return resultCreator ? resultCreator(item) : null;
  }).filter(Boolean);
  
  return results;
}
