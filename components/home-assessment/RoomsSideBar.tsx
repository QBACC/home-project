import * as React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  PseudoBox,
  Stack,
  Text,
} from "@chakra-ui/core";
import { BRAND600, BRAND700 } from "../../utils/colors";
import { transformRoomTypeToLabel } from "../../interfaces/home-assessment";

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
};

export const RoomsSideBar: React.FC<Props> = ({
  rooms,
  changedSelectedRoom,
  addRoom,
  deleteRoom,
  selectedRoomId,
}) => {
  const preventDeletionOfFirstRoom = React.useMemo(() => rooms.length === 1, [
    rooms.length,
  ]);

  return (
    <Box bg={BRAND600} margin="2pt" padding="4pt" borderRadius="2pt">
      <Heading as="h3" size="xs" textTransform="uppercase">
        Rooms
      </Heading>
      <Box marginTop="8pt">
        {rooms.map((room, i) => (
          <RoomComponent
            key={room.name}
            room={room}
            roomDeleted={deleteRoom}
            roomSelected={changedSelectedRoom}
            isSelected={room.id === selectedRoomId}
            isDisabled={i === 0 ? preventDeletionOfFirstRoom : false}
          />
        ))}
      </Box>
      <Button
        marginTop={"16pt"}
        variant="outline"
        variantColor="green"
        leftIcon="add"
        size="sm"
        width="100%"
        onClick={addRoom}
      >
        Add room
      </Button>
    </Box>
  );
};

const RoomComponent: React.FC<{
  room: Room;
  isSelected: boolean;
  isDisabled: boolean;
  roomSelected: (id: string) => void;
  roomDeleted: (id: string) => void;
}> = ({ room, isDisabled, isSelected, roomSelected, roomDeleted }) => {
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
      borderRadius="2pt"
      bg={isSelected ? BRAND700 : null}
      marginBottom="4pt"
      _hover={{ bg: BRAND700, cursor: "pointer" }}
      _focus={{ boxShadow: "outline" }}
      onClick={handleRoomSelect}
    >
      <Flex padding="4pt" alignItems="center">
        <Stack spacing={0} flexBasis="100%">
          <Heading as="h4" fontSize="md" color="gray.600">
            {room.name}
          </Heading>
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
