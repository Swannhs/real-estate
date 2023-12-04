package com.fortunatis.estateservice.util;

import com.fortunatis.estateservice.pojo.request.EstateSearchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.fortunatis.estateservice.util.ApplicationConstants.ENTRIES_PER_PAGE;

@Component
@RequiredArgsConstructor
@Slf4j
public class UtilityService {
    public static boolean hasValidEstateFilter(EstateSearchDto searchEstateDTO) {
        return Stream.<Supplier<Boolean>>of(
                        () -> searchEstateDTO.getEstateIds() != null && !searchEstateDTO.getEstateIds().isEmpty(),
                        () -> !ObjectUtils.isEmpty(searchEstateDTO.getEstateTypes()),
                        () -> !ObjectUtils.isEmpty(searchEstateDTO.getEstateAdsPurpose()),
                        () -> !ObjectUtils.isEmpty(searchEstateDTO.getPriceStart()),
                        () -> !ObjectUtils.isEmpty(searchEstateDTO.getPriceEnd()),
                        () -> !ObjectUtils.isEmpty(searchEstateDTO.getAddressLine1()),
                        () -> !ObjectUtils.isEmpty(searchEstateDTO.getSearchKeywords()),
                        () -> !ObjectUtils.isEmpty(searchEstateDTO.getFilter())
                )
                .anyMatch(Supplier::get);
    }

    /**
     * Generate Plain SQL from searchCriteriaList
     * SELECT * FROM estate JOIN estate_location ON estate.location_id = estate_location. id WHERE is_active = true and is_deleted = false
     * AND is_active = true and is_deleted = false AND estate_price >= 555 AND estate_price <= 9999
     * AND lower(address) LIKE lower('%Genève%')
     *
     * @return String
     */
    public static String buildSearchQueryForPublicEstateSearch(EstateSearchDto searchEstateDTO) {
        StringBuilder query = new StringBuilder();

        query.append("SELECT * FROM estate");
        query.append(" JOIN estate_location ON estate.location_id = estate_location.id");
        query.append(" LEFT JOIN estate_search_priority ON estate_search_priority.id = estate.estate_search_priority_id");
        query.append(" WHERE is_active = true AND is_deleted = false");

        if (searchEstateDTO.getEstateIds() != null && !searchEstateDTO.getEstateIds().isEmpty()) {
            String ids = searchEstateDTO.getEstateIds().stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(","));
            query.append(" AND estate.id IN (").append(ids).append(")");
        }

        query.append(bindForFeaturesFilterHeader(searchEstateDTO));
        query.append(buildQuery(searchEstateDTO));

        if (!ObjectUtils.isEmpty(searchEstateDTO.getOrderBy())) {
            query.append(" ORDER BY ").append(searchEstateDTO.getOrderBy());
        }

        query.append(" LIMIT ").append(ENTRIES_PER_PAGE).append(" OFFSET ")
                .append(searchEstateDTO.getPage() * ENTRIES_PER_PAGE);

//        log.info("Generated SQL: {}", query);
        return query.toString();
    }

    /**
     * Have to prevent sql injection only replacing single quote is not enough.
     *
     * @param searchEstateDTO
     * @return
     */
    static String buildQuery(EstateSearchDto searchEstateDTO) {
        StringBuilder query = new StringBuilder();

        if (!ObjectUtils.isEmpty(searchEstateDTO.getEstateTypes())) {
            query.append(" AND estate_type IN ").append(searchEstateDTO.getEstateTypes().stream().collect(Collectors.joining("','", "('", "')")));
        }
        if (!ObjectUtils.isEmpty(searchEstateDTO.getEstateAdsPurpose())) {
            query.append(" AND estate_advertise_purpose IN ").append(searchEstateDTO.getEstateAdsPurpose().stream().collect(Collectors.joining("','", "('", "')")));
        }
        if (!ObjectUtils.isEmpty(searchEstateDTO.getPriceStart())) {
            query.append(" AND estate_price >= ").append(searchEstateDTO.getPriceStart());
        }
        if (!ObjectUtils.isEmpty(searchEstateDTO.getPriceEnd())) {
            query.append(" AND estate_price <= ").append(searchEstateDTO.getPriceEnd());
        }
        if (!ObjectUtils.isEmpty(searchEstateDTO.getAddressLine1())) {
            query.append(" AND lower(address_line_1) LIKE '%").append(searchEstateDTO.getAddressLine1().trim().replaceAll("'", "''").toLowerCase()).append("%'");
        }
        if (!ObjectUtils.isEmpty(searchEstateDTO.getSearchKeywords())) {
            List<String> keywords = Arrays.asList(searchEstateDTO.getSearchKeywords().split(","));
            if (keywords.size() == 1) {
                query.append(" AND lower(search_keywords) LIKE '%").append(searchEstateDTO.getSearchKeywords().trim().replaceAll("'", "").toLowerCase()).append("%'");
            } else {
                String orCondition = keywords.stream().map(keyword -> "lower(search_keywords) LIKE '%" + keyword.trim().replaceAll("'", "").toLowerCase() + "%'").collect(Collectors.joining(" OR ", "(", ")"));
                query.append(" AND ").append(orCondition);
            }
        }

        if (!ObjectUtils.isEmpty(searchEstateDTO.getFilter())) {
            query.append(bindFilterQuery(searchEstateDTO));
        }

        query.append(" GROUP BY estate_search_priority.id, estate.id, estate_location.id");
        query.append(" ORDER BY estate_search_priority.priority DESC");

        return query.toString();
    }

    static String bindFilterQuery(EstateSearchDto searchEstateDTO) {
        StringBuilder query = new StringBuilder();

        if (!ObjectUtils.isEmpty(searchEstateDTO.getFilter().getMaxRoomNumber())) {
            query
                    .append(" AND rooms BETWEEN '")
                    .append(
                            ObjectUtils.isEmpty(
                                    searchEstateDTO.getFilter().getMinRoomNumber()) ?
                                    0 :
                                    searchEstateDTO
                                            .getFilter()
                                            .getMinRoomNumber()
                    )
                    .append("' AND '")
                    .append(
                            searchEstateDTO
                                    .getFilter()
                                    .getMaxRoomNumber()
                    )
                    .append("'");
        }

        if (!ObjectUtils.isEmpty(searchEstateDTO.getFilter().getLivingAreaEnd())) {
            query
                    .append(" AND living_area BETWEEN '")
                    .append(
                            ObjectUtils.isEmpty(searchEstateDTO.getFilter().getLivingAreaStart()) ?
                                    0 :
                                    searchEstateDTO
                                            .getFilter()
                                            .getLivingAreaStart()
                    )
                    .append("' AND '")
                    .append(
                            searchEstateDTO
                                    .getFilter()
                                    .getLivingAreaEnd()
                                    .toString()
                                    .trim()
                                    .replaceAll("'", "''")
                    )
                    .append("'");
        }

        if (!ObjectUtils.isEmpty(searchEstateDTO.getFilter().getLotAreaEnd())) {
            query
                    .append(" AND estate_lot_area BETWEEN '")
                    .append(
                            ObjectUtils.isEmpty(searchEstateDTO.getFilter().getLotAreaStart()) ?
                                    0 :
                                    searchEstateDTO
                                            .getFilter()
                                            .getLotAreaStart()
                    )
                    .append("' AND '")
                    .append(
                            searchEstateDTO
                                    .getFilter()
                                    .getLotAreaEnd()
                    )
                    .append("'");
        }

        if (!ObjectUtils.isEmpty(searchEstateDTO.getFilter().getFloorSpaceEnd())) {
            query
                    .append(" AND estate_floor_space BETWEEN '")
                    .append(
                            ObjectUtils.isEmpty(searchEstateDTO.getFilter().getFloorSpaceStart()) ?
                                    0 :
                                    searchEstateDTO
                                            .getFilter()
                                            .getFloorSpaceStart()
                    )
                    .append("' AND '")
                    .append(
                            searchEstateDTO
                                    .getFilter()
                                    .getFloorSpaceEnd()
                    )
                    .append("'");
        }

        if (!ObjectUtils.isEmpty(searchEstateDTO.getFilter().getEstateYearOfBuildingEnd())) {
            query
                    .append(" AND estate_year_of_building BETWEEN '")
                    .append(
                            ObjectUtils.isEmpty(searchEstateDTO.getFilter().getEstateYearOfBuildingStart()) ?
                                    0 :
                                    searchEstateDTO
                                            .getFilter()
                                            .getEstateYearOfBuildingStart()
                    )
                    .append("' AND '")
                    .append(
                            searchEstateDTO
                                    .getFilter()
                                    .getEstateYearOfBuildingEnd()
                    )
                    .append("'");
        }

        return query.toString();
    }

    static String bindForFeaturesFilterHeader(EstateSearchDto searchEstateDTO) {
        StringBuilder query = new StringBuilder();
        if (!ObjectUtils.isEmpty(searchEstateDTO.getFilter())) {
            if (!ObjectUtils.isEmpty(searchEstateDTO.getFilter().getEstateFeatures()) && !searchEstateDTO.getFilter().getEstateFeatures().isEmpty()) {
                query.append(" AND estate.id IN (SELECT ef1.estates_id FROM estate_features ef1 ");

                for (int i = 2; i <= searchEstateDTO.getFilter().getEstateFeatures().size(); i++) {
                    query.append("JOIN estate_features ef").append(i).append(" ON ef1.estates_id = ef").append(i).append(".estates_id ");
                }

                query.append("WHERE ");
                int featureIndex = 1;
                for (UUID featureId : searchEstateDTO.getFilter().getEstateFeatures()) {
                    query.append("ef").append(featureIndex).append(".feature_id = ").append(featureId).append(" AND ");
                    featureIndex++;
                }

                query.delete(query.length() - 5, query.length()); // Remove the trailing " AND "
                query.append(")");
            }

            if (!ObjectUtils.isEmpty(searchEstateDTO.getFilter().getEstateAdvertiser()) && !searchEstateDTO.getFilter().getEstateAdvertiser().isEmpty()) {
                query.append(" AND estate_advertiser IN ").append(searchEstateDTO.getFilter().getEstateAdvertiser().stream().collect(Collectors.joining("','", "('", "')")));
            }
        }
        return query.toString();
    }

    public static String countSearchResult(String generatedSql) {
        StringBuilder query = new StringBuilder();

        query.append(generatedSql);
        query.replace(query.indexOf("SELECT"), query.indexOf("FROM"), "SELECT COUNT(*)");
        query.delete(query.indexOf("GROUP"), query.length());

        return query.toString();
    }
}
