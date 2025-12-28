# --------------------------------------------------------------------------------------------------------
# Link libraries
# --------------------------------------------------------------------------------------------------------

include(FetchContent)

FetchContent_Declare(
    saucer
    GIT_REPOSITORY "https://github.com/saucer/saucer"
    GIT_TAG $VERSION$
)

FetchContent_MakeAvailable(saucer)

saucer_embed("out" TARGET ${PROJECT_NAME})
target_link_libraries(${PROJECT_NAME} PRIVATE saucer::saucer saucer::embedded)
