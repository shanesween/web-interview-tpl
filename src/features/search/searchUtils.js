const resultCreators = {
  events: (item) => {
    const performer = item.performers.find(p => p.primary) || item.performers[0];
    return {
      id: item.id,
      image: performer.hero_image_url,
      title: item.event.name,
      subtitle: item.venue.name
    };
  },
  venues: (item) => {
    return {
      id: item.id,
      image: item.image_url,
      title: item.name,
      subtitle: item.city
    };
  },
  performers: (item) => {
    return {
      id: item.id,
      image: item.hero_image_url,
      title: item.name,
      subtitle: item.category
    };
  }
};

const TOP_PICK = 'top_pick'
const DEFAULT_RESULT_CREATOR = 'events'

const mapResults = (items) => (
 items.map(item => {
    const resultCreator = resultCreators[item?.meta?.display_group] || resultCreators[DEFAULT_RESULT_CREATOR];
    return resultCreator ? resultCreator(item) : null;
  }).filter(Boolean)
)

export const sortResults = (data) => {
  const {display_groups: groups, ...groupTypes} = data

  let items = [];

  groups.forEach(group => {
    let groupItems = [];
    if (group.slug === TOP_PICK) {
      const results = Object.values(groupTypes).flat();
      const topPicks = results?.filter(item => item?.meta?.display_group === TOP_PICK)
      groupItems = topPicks?.slice(0, 3) || [];
    } else {
      groupItems = data[group.slug]?.slice(0, 3) || [];
    }
    
    items = [...items, ...groupItems];
  });

  const results = mapResults(items)

  return results;
}
