import * as React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  PseudoBox,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/core";
import { transformRoomTypeToLabel } from "../../interfaces/home-assessment";
import { useIsAssessmentValid } from "./hooks/useIsAssessmentValid";

type Room = {
  id: string;
  name: string;
  type: "LIVING" | "BED" | "WASH";
};

type Props = {
  rooms: Room[];
  selectedRoomId: string;
  addRoom: () => void;
  deleteRoom: (id: string) => void;
  changedSelectedRoom: (id: string) => void;
  generateReport: () => void;
};

export const RoomsSideBar: React.FC<Props> = ({
  rooms,
  changedSelectedRoom,
  addRoom,
  deleteRoom,
  generateReport,
  selectedRoomId,
}) => {
  const toast = useToast();
  // only show error state after the user first tries to generate a report
  const [showErrors, setShowErrors] = React.useState(false);
  const [isAssessmentValid, invalidRoomIds] = useIsAssessmentValid(rooms);
  const preventDeletionOfFirstRoom = React.useMemo(() => rooms.length === 1, [
    rooms.length,
  ]);

  const handleGenerateReport = React.useCallback(() => {
    if (isAssessmentValid) {
      generateReport();
    } else {
      setShowErrors(true);
      toast({
        description: "Please complete all prompts before proceeding",
        status: "error",
        position: "top-right",
      });
    }
  }, [isAssessmentValid, toast]);

  return (
    <Box bg="gray.100" margin="2pt" padding="4pt" rounded="md">
      <Stack isInline align="center" justifyContent="space-between">
        <Heading as="h3" size="xs" textTransform="uppercase">
          Rooms
        </Heading>
        <Button
          variant="outline"
          variantColor="green"
          leftIcon="add"
          size="xs"
          onClick={addRoom}
        >
          Add room
        </Button>
      </Stack>
      <Box marginTop="8pt">
        {rooms.map((room, i) => (
          <RoomComponent
            key={room.name}
            room={room}
            roomDeleted={deleteRoom}
            roomSelected={changedSelectedRoom}
            isSelected={room.id === selectedRoomId}
            isInvalid={showErrors && invalidRoomIds.includes(room.id)}
            isDisabled={i === 0 ? preventDeletionOfFirstRoom : false}
          />
        ))}
      </Box>
      <Button
        marginTop={"16pt"}
        variantColor="blue"
        size="sm"
        width="100%"
        onClick={handleGenerateReport}
      >
        Generate report
      </Button>
    </Box>
  );
};

const RoomComponent: React.FC<{
  room: Room;
  isSelected: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  roomSelected: (id: string) => void;
  roomDeleted: (id: string) => void;
}> = ({
  room,
  isDisabled,
  isSelected,
  isInvalid,
  roomSelected,
  roomDeleted,
}) => {
  const handleRoomSelect = React.useCallback(() => roomSelected(room.id), [
    roomSelected,
    room.id,
  ]);

  const handleRoomDelete = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      roomDeleted(room.id);
    },
    [roomDeleted, room.id]
  );

  return (
    <PseudoBox
      rounded="md"
      borderWidth={"1pt"}
      borderColor={isSelected ? "gray.300" : "gray.100"}
      marginBottom="4pt"
      _hover={{ bg: "gray.300", cursor: "pointer" }}
      _focus={{ boxShadow: "outline" }}
      onClick={handleRoomSelect}
    >
      <Flex padding="4pt" alignItems="center">
        <Stack spacing={0} flexBasis="100%">
          <Stack isInline>
            {isInvalid && <Icon name="warning" color="red.500" />}
            <Heading as="h4" fontSize="md" color="gray.600">
              {room.name}
            </Heading>
          </Stack>
          <Text fontSize="xs">{transformRoomTypeToLabel(room.type)} </Text>
        </Stack>
        <IconButton
          variantColor="gray"
          aria-label="delete"
          size="sm"
          opacity={0.8}
          icon="delete"
          variant="ghost"
          onClick={handleRoomDelete}
          isDisabled={isDisabled}
          isRound
        />
      </Flex>
    </PseudoBox>
  );
};
