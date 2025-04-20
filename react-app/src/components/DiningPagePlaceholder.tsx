import { Box, Grid, Skeleton, Stack } from "@mui/material";

const RestaurantCardSkeleton = () => (
    <Box width={300} borderRadius={2} overflow="hidden" boxShadow={2}>
        <Skeleton variant="rectangular" height={180} />
        <Box p={2}>
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="60%" height={20} />
            <Stack direction="row" spacing={1} mt={2}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="text" width={40} />
            </Stack>
            <Skeleton variant="text" width="50%" height={20} sx={{ mt: 1 }} />
        </Box>
    </Box>
);

const DiningPagePlaceholder = () => {
    return (
        <Box mt={5} display="flex" flexDirection="row" width="100%">
            <Box width="500px" mr={5}>
                <Stack spacing={2}>
                    <Skeleton variant="text" width="60%" height={30} />
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} variant="rounded" width="100%" height={30} />
                    ))}
                </Stack>
            </Box>

            <Box>
                <Stack direction="row" spacing={2} mb={4}>
                    <Skeleton variant="rounded" width="50%" height={40} />
                    <Skeleton variant="rounded" width={120} height={40} />
                </Stack>

                {/* Restaurant Cards */}
                <Grid container spacing={4}>
                    {[...Array(6)].map((_, i) => (
                        <Grid key={`placeholder-card-${i}`}>
                            <RestaurantCardSkeleton />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default DiningPagePlaceholder;
