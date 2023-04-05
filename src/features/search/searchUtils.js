/**
 * @resultCreators
 * An object that contains three functions: events, venues, and performers. 
 * Each function takes an item as an argument and returns an object with 
 * properties id, image, title, and subtitle. These functions are used to 
 * create consistent results objects for each type of item.
 */

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

/**
 * @mapResults
 * A function that maps over an array of items and uses the resultCreators
 * functions to create results objects based on the item's meta.display_group.
 * 
 * @param items - array of search results
 * 
 * @returns array of non-null objects
 */
const mapResults = (items) => (
 items.map(item => {
    const resultCreator = resultCreators[item?.meta?.display_group] || resultCreators[DEFAULT_RESULT_CREATOR];
    return resultCreator ? resultCreator(item) : null;
  }).filter(Boolean)
)

/**
 * @sortResults
 * A helper function that takes in an object of search results from the API fetchSearch
 * and gets the sorted order of display groups. Then, the array of display groups is looped through 
 * with a maximum of 3 results per group being added to the final array. The function also extrapolates
 * top picks from the other group types (venues, performers, events) and adds them to the top pick group.
 * The sorted results are then returned as an array of objects, each containing information about the search result. 
 * 
 * @param data An object returned from the API query.
 * 
 * @returns An array of objects containing information about the search results, 
 * sorted by display groups with a maximum of 3 results per group.
 */
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
      // TODO: Remove duplicated top pick from groupItem as they will be grouped in line 74-77
      groupItems = data[group.slug]?.slice(0, 3) || [];
    }
    
    items = [...items, ...groupItems];
  });

  const results = mapResults(items)

  return results;
}
