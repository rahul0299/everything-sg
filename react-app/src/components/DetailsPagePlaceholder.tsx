import {Box, Skeleton, Typography} from "@mui/material";

const DetailsPagePlaceholder = () => {
    return (
        <Box>
            <Box display="flex" width="100%" height="500px">
                {/* Poster Skeleton */}
                <Box width="100%" height="100%" sx={{ p: 2 }}>
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                </Box>
            </Box>

            {/* About Section */}
            <Box mt={6} px={3}>
                <Typography variant="h6">
                    <Skeleton width="20%" />
                </Typography>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="95%" />
                <Skeleton variant="text" width="80%" />
            </Box>
        </Box>
    );
}

export default DetailsPagePlaceholder;